import { Component, OnInit } from '@angular/core';
import { MockSlicesOne } from 'projects/dynamic-pie-chart/src/lib/mock-slices-one';
import { BehaviorSubject } from 'rxjs';
import { Slice } from 'dist/dynamic-pie-chart/lib/slice';
import { TypeSlice } from 'dist/dynamic-pie-chart/lib/type-slice';
import { MockSlicesTwo } from 'projects/dynamic-pie-chart/src/lib/mock-slices-two';

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
