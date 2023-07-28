export const getPrice = (price) => {
  const numFormat = price.toString();
  const separator = ' ';
  return numFormat.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, `$1${separator}`);
};

export const convertDuration = (min) => {
  const time = [Math.trunc(min / 60), min % 60].map((el) => (el < 10 ? `0${el}` : el)).join('');
  return `${time.slice(0, 2)}ч ${time.slice(2, 4)}м`;
};

export const stopsCount = (body) => {
  const { stops } = body;
  const count = stops.length;

  if (count === 0) {
    return 'Без пересадок';
  }
  if (count === 1) {
    return '1 пересадка';
  }
  return `${count} пересадки`;
};

export const filter = (arr, cheaper, faster, optimal, checkedList) => {
  let filtered = [...arr];

  switch (true) {
    case cheaper:
      filtered = filtered.sort((a, b) => a.price - b.price);
      break;
    case faster:
      filtered = filtered.sort((a, b) => {
        const durationA = a.segments.reduce((total, segment) => total + segment.duration, 0);
        const durationB = b.segments.reduce((total, segment) => total + segment.duration, 0);
        return durationA - durationB;
      });
      break;
    case optimal:
      filtered = filtered.sort((a, b) => {
        const stopsCountA = a.segments.reduce((total, segment) => total + segment.stops.length, 0);
        const stopsCountB = b.segments.reduce((total, segment) => total + segment.stops.length, 0);

        if (stopsCountA !== stopsCountB) {
          return stopsCountA - stopsCountB;
        }
        return a.price - b.price;
      });
      break;
    default:
      break;
  }

  filtered = filtered.filter((ticket) => {
    const fromStopsCount = ticket.segments[0].stops.length;
    const toStopsCount = ticket.segments[1].stops.length;
    const fromIncluded = checkedList.includes(`${fromStopsCount}`);
    const toIncluded = checkedList.includes(`${toStopsCount}`);

    return fromIncluded && toIncluded;
  });

  return filtered;
};
