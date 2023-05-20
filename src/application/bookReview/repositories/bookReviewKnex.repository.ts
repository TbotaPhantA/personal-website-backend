import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { BookReviewRepository } from './bookReviewRepository';
import { BookReview } from '../../../domain/bookReview/bookReview';
import { InjectKnex } from '../../../infrastructure/knex/shared/injectKnex';
import { RawBookReview } from '../../../domain/bookReview/shared/types/rawBookReview';
import * as T from 'fp-ts/Task';

@Injectable()
export class BookReviewKnexRepository implements BookReviewRepository {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  findById(id: string, transaction: Knex.Transaction): T.Task<BookReview | undefined> {
    return async () => {
      const rawBookReviews = await this.findAllQuery(transaction).where({ 'book_reviews.id': id });
      return rawBookReviews?.[0] ? new BookReview(rawBookReviews[0]) : undefined;
    }
  }

  getAll(): T.Task<BookReview[]> {
    return async () => {
      const rawBookReviews = await this.findAllQuery(this.knex);
      return rawBookReviews.map(r => new BookReview(r));
    }
  }

  private findAllQuery(knex: Knex) {
    const articleTranslationsJson = `
      json_agg(json_build_object(
        'id', article_translations.id,
        'articleId', article_translations.article_id,
        'languageId', article_translations.language_id,
        'title', article_translations.title,
        'content', article_translations.content
      ))
    `

    const articleJson = `
      json_build_object(
        'id', articles.id,
        'originalLanguageId', articles.original_language_id,
        'originalTitle', articles.original_title,
        'originalContent', articles.original_content,
        'translations', ${articleTranslationsJson} 
      ) as article
    `;

    return knex
      .select('book_reviews.id', this.knex.raw(articleJson))
      .from<RawBookReview>('book_reviews')
      .leftJoin('articles', { 'articles.id': 'book_reviews.article_id' })
      .leftJoin('article_translations', { 'article_translations.article_id': 'articles.id' })
      .groupByRaw('book_reviews.id, articles.id')
  }

  insert(bookReview: BookReview, transaction: Knex.Transaction): T.Task<BookReview> {
    return async () => {
      return transaction
        .with(
          'inserted_article',
          transaction.insert({
            id: bookReview.article.id,
            original_language_id: bookReview.article.originalLanguageId,
            original_title: bookReview.article.originalTitle,
            original_content: bookReview.article.originalContent,
          }).into('articles'),
        )
        .with(
          'inserted_article_translations',
          transaction.insert(bookReview.article.translations.map(t => ({
            id: t.id,
            article_id: t.articleId,
            language_id: t.languageId,
            title: t.title,
            content: t.content,
          }))).into('article_translations'),
        )
        .insert({
          id: bookReview.id,
          article_id: bookReview.article.id,
        })
        .into('book_reviews');
    }
  }

  update(bookReview: BookReview, transaction: Knex.Transaction): T.Task<BookReview> {
    return async () => {
      return transaction
        .with(
          'updated_article',
          transaction.update({
            id: bookReview.article.id,
            original_language_id: bookReview.article.originalLanguageId,
            original_title: bookReview.article.originalTitle,
            original_content: bookReview.article.originalContent,
          })
            .where({ id: bookReview.article.id })
            .into('articles'),
        )
        .with(
          'removed_article_translations',
          transaction
            .where({ article_id: bookReview.article.id })
            .del()
            .into('article_translations'),
        )
        .with(
          'inserted_article_translations',
          transaction.insert(bookReview.article.translations.map(t => ({
            id: t.id,
            article_id: t.articleId,
            language_id: t.languageId,
            title: t.title,
            content: t.content,
          }))).into('article_translations'),
        )
        .update({
          id: bookReview.id,
          article_id: bookReview.article.id,
        })
        .where({ id: bookReview.id })
        .into('book_reviews')
    }
  }
}
