import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {EventsComponent} from './events/events.component';
import {SectionTitleComponent} from './section-title/section-title.component';
import {EventCardComponent} from './event-card/event-card.component';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {MateriaElementComponent} from './materia-element/materia-element.component';
import {EnterateComponent} from './enterate/enterate.component';
import {PerfilComponent} from './perfil/perfil.component';
import {FormsModule} from '@angular/forms';



@NgModule({
    declarations: [
        HeaderComponent,
        EventsComponent,
        SectionTitleComponent,
        EventCardComponent,
        MateriaElementComponent,
        EnterateComponent,
        PerfilComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        RouterModule,
        FormsModule
    ],
    exports: [
        HeaderComponent,
        EventsComponent,
        EventCardComponent,
        SectionTitleComponent,
        MateriaElementComponent,
        EnterateComponent,
        PerfilComponent
    ]
})
export class ComponentsModule { }
