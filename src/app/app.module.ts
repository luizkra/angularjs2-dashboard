import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }      from '@angular/http';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { CircleComponent } from './chart/circle/circle.component';
import { DatosService } from './datos.service';
import { ValuePipePipe } from './value-pipe.pipe';
import { TruncateModule } from 'ng2-truncate';

@NgModule({
  declarations: [
    AppComponent,
    CircleComponent,
    ValuePipePipe
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    HttpModule,
    TruncateModule 
  ],
  providers: [DatosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
