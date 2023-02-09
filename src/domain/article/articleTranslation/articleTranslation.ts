import { ArticleTranslationFormDto } from '../shared/dto/form/articleTranslationForm.dto';
import { v4 as uuid } from 'uuid';

type CreationProps = ArticleTranslationFormDto & {
  articleId: string;
};

export class ArticleTranslation {
  readonly id: string;
  readonly articleId: string;
  readonly languageId: string;
  readonly title: string;
  readonly content: string;

  constructor(props: CreationProps) {
    this.id = uuid();
    this.articleId = props.articleId;
    this.languageId = props.languageId;
    this.title = props.title;
    this.content = props.content;
  }
}
