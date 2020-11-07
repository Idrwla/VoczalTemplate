import {Component, OnInit, ViewChild} from '@angular/core';
import {CreateComponent} from './create/create.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  @ViewChild('childComp') crChild ;
  bridge = (railwayId) => {
    this.crChild.edit(railwayId);
  }
}
