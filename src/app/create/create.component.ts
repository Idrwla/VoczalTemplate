import {Component, Input, OnInit} from '@angular/core';
import {Vagon} from '../Shared/vagon';
import { ListOfVagons} from '../Shared/listOfVagons';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  model = {
    numberOfVagon: '',
    nameOfVagon: '',
    stateOfVagon: '',
    typeOfVagon: ''
  };
  invalidName: boolean;
  invalidState: boolean;
  invalidNUmber: boolean;
  constructor() { }
  nameValidation(): boolean{
    this.model.nameOfVagon.length >= 50 || this.model.nameOfVagon === '' ? this.invalidName = true : this.invalidName = false;
    return this.invalidName;
  }
  stateValidation(): boolean{
    this.model.stateOfVagon === '' ? this.invalidState = true :  this.invalidState = false;
    return this.invalidState;
  }
  numberValidation(): void{
    let exist: boolean;
    console.log(this.model.numberOfVagon);
    ListOfVagons.listOfVagons.forEach((item) => {
      if (this.model.numberOfVagon === item.id) {
        exist = true;
      }
    });
    if (this.model.numberOfVagon.length !== 8){
      this.invalidNUmber = true;
    }else if (exist){
      this.invalidNUmber = true;
    }else {
      const firstD = this.model.numberOfVagon[0];
      switch (firstD){
        case '2':
          this.model.typeOfVagon += 'Крытый грузовой вагон';
          break;
        case '4':
          this.model.typeOfVagon += 'Платформа';
          break;
        case '6':
          this.model.typeOfVagon += 'Полувагон';
          break;
        case '7':
          this.model.typeOfVagon += 'Цистерна';
          break;
        case '8':
          this.model.typeOfVagon += 'Изотермические вагон';
          break;
        case '5':
          this.model.typeOfVagon += 'Собственные';
          break;
        case '9' || '3':
          this.model.typeOfVagon += 'Прочие';
          break;
      }
      this.invalidNUmber = false;
    }
  }
  edit(railwayId): void{
    const temp = ListOfVagons.listOfVagons.filter(
      (item) => {
        return item.id === railwayId;
      }
    );
    this.model.numberOfVagon = temp[0].id;
    this.model.nameOfVagon = temp[0].name;
    this.model.stateOfVagon = temp[0].state;
  }
  submit(): void{
    this.nameValidation();
    this.numberValidation();
    this.stateValidation();
    if (!(this.invalidNUmber ||
        this.invalidName ||
        this.invalidState )){
      const newVagon = new Vagon(this.model.nameOfVagon, this.model.numberOfVagon , this.model.stateOfVagon, this.model.typeOfVagon );
      ListOfVagons.listOfVagons.push(newVagon);
      this.model = {
        numberOfVagon: '',
        nameOfVagon: '',
        stateOfVagon: '',
        typeOfVagon: ''
      };
    }
    // console.log(this.invalidNUmber);
    // console.log(this.invalidState);
    // console.log(this.invalidName);
    // console.log((this.invalidNUmber &&
    //   this.invalidName &&
    //   this.invalidState));
    // console.log(ListOfVagons.listOfVagons[0]);
  }

}
