import * as plantRepository from '../repositories/plant';
import * as timelineRepository from '../repositories/timeline';
import * as weekRepository from '../repositories/week';
import moment from 'moment';

export const add = async (newPlant: any) => {
  const plant = (await plantRepository.addPlant(newPlant)) as any;

  const timelineWeeks = get12Weeks(moment());
  const weeks = (await weekRepository.addMany(timelineWeeks)) as any[];
  const weekIds = weeks.map(week => week._id);
  console.log(plant._id);
  const updated = await plantRepository.update(plant._id, { weeks: weekIds });

  return updated;
};

function get12Weeks(start) {
  let weeks = [];

  weeks.push(getWeek(moment()));

  for (var i = 0; i < 11; i++) {
    const prevWeek = weeks[weeks.length - 1];
    const newWeek = getWeek(moment(prevWeek.end).add(1, 'days'));
    weeks.push(newWeek);
  }

  return weeks;
}

function getWeek(start: moment.Moment) {
  return {
    start: start.toDate(),
    end: start.add(6, 'days').toDate()
  };
}
