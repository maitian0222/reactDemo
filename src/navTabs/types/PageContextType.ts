import PageStack from '../services/PageStack';
import { History } from 'history';

export default interface PageContextType {
  pageStack: PageStack;
  history: History;
}
