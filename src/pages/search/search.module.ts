import { NgModule } from '@angular/core';
import { SearchPage} from './search';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [SearchPage],
  imports: [IonicPageModule.forChild(SearchPage)],
  entryComponents: [
    SearchPage
  ]
})
export class SearchPageModule { }