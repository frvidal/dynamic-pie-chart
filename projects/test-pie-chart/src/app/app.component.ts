import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Slice } from 'dynamic-pie-chart';
import { TypeSlice } from 'dynamic-pie-chart';
import { MockSlicesOne } from 'dynamic-pie-chart';
import { MockSlicesTwo } from 'dynamic-pie-chart';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'test-pie-chart';

  public slices$ = new BehaviorSubject<Slice[]>([]);

  public typeSlices$ = new BehaviorSubject<TypeSlice[]>([]);

  public legend = true;

  ngOnInit(): void {
    const typeSlices = [
      {type: 1, label: 'Eins'},
      {type: 2, label: 'Zwei'},
      {type: 3, label: 'Drei'}
    ];
    this.typeSlices$.next(typeSlices);

    this.slices$.next(MockSlicesOne);
    setTimeout(() => {
      this.slices$.next(MockSlicesTwo);
    }, 5000);
  }

  /**
   * A slice has been selected.
   * @param slice the selected slice
   */
  public sliceSelection(slice: Slice) {
    console.log ('Slice identifier selected', slice.id);
  }

  /**
   * A slice has been activated.
   * @param the activated slice
   */
  public sliceActivation(slice: Slice) {
    console.log ('Slice identifier activated', slice.id);
  }
}
