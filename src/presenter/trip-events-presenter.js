import {render, RenderPosition} from '../render.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import EditPointView from '../view/edit-point-view.js';
import AddPointView from '../view/add-point-view';
import PointView from '../view/point-view';

export default class TripEventsPresenter {
  pointCount = 2;
  sort = new SortView();
  pointList = new PointListView();

  init = (container, pointsModel) => {
    this.pointsModel = pointsModel;
    this.container = container;
    this.pointsBorder = pointsModel.points;

    render(this.sort, this.container);
    render(this.pointList, this.sort.element, RenderPosition.AFTEREND);
    render(new AddPointView(this.pointsModel.destinationList), this.pointList.element);

    const firstPoint = this.pointsBorder[0];
    this.pointsBorder.shift();
    render(new EditPointView(
      firstPoint ,
      this.pointsModel.getOffers(firstPoint ),
      this.pointsModel.getDestination(firstPoint),
      this.pointsModel.destinationList
    ), this.pointList.element);

    for (const point of this.pointsBorder) {
      render(
        new PointView(
          point,
          this.pointsModel.getOffers(point),
          this.pointsModel.getDestination(point)
        ), this.pointList.element);
    }
  };
}
