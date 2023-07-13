export default class AviasalesService {
  _apiBase = 'https://aviasales-test-api.kata.academy';

  constructor() {
    this.getSearchId = () => {
      this.requestSearchId().then((searchId) => {
        localStorage.setItem('searchId', searchId.searchId);
      });
    };
  }

  async requestSearchId() {
    const url = `${this._apiBase}/search`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, received ${response.status}`);
    }
    return await response.json();
  }

  // eslint-disable-next-line class-methods-use-this
  async requestTickets() {
    const searchId = localStorage.getItem('searchId');
    const url = `${this._apiBase}/tickets?searchId=${searchId}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, received ${response.status}`);
    }
        

    return await response.json();
  }

  async getTickets() {
    const data = await this.requestTickets();
    return data.tickets.map((ticket) => this._transformTickets(ticket));
  }

  _getLogo = (carrier) => {
    return `https://pics.avs.io/99/36/${carrier}.png`;
  };

  _getTimeOfPath = (date, duration) => {
    const depDate = new Date(date);
    const arrivDate = new Date(Date.parse(date) + duration * 60000);
    const getTime = (anyDate) => {
      const time = [
        anyDate.getHours(),
        anyDate.getMinutes()
      ].map((el) => el < 10 ? `0${  el}` : el)
      .join(':');
      return time;
    };

    const depTime = getTime(depDate);
    const arrivTime = getTime(arrivDate);
    return `${depTime} - ${arrivTime}`;
  }

  _transformBodyTickets = (info) => {
    return {
      from: info.origin,
      to: info.destination,
      timeOfPath: this._getTimeOfPath(info.date, info.duration),
      duration: info.duration,
      stops: info.stops,
    };
  };

  _transformTickets = (ticket) => {
    return {
      price: ticket.price,
      logo: this._getLogo(ticket.carrier),
      segments: ticket.segments.map((body) => this._transformBodyTickets(body))
    };
  };
}