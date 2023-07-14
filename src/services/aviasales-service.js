/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-continue */
export default class AviasalesService {
  _apiBase = 'https://aviasales-test-api.kata.academy';

  constructor() {
    this.getSearchId = () => {
      this.requestSearchId().then((searchId) => {
        localStorage.setItem('searchId', searchId.searchId);
      });
    };
  }

  async retry(requestFunction, maxAttempts = 3) {
    let attempts = 0;
    while (attempts < maxAttempts) {
      try {
        const response = await requestFunction();
        return response;
      } catch (error) {
        if (error instanceof Error && error.message.includes('received 500')) {
          attempts++;
          continue;
        }
        throw error;
      }
    }
  }

  async checkSearchStatus() {
    const searchId = localStorage.getItem('searchId');
    const url = `${this._apiBase}/tickets?searchId=${searchId}`;

    const requestFunction = async () => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Could not fetch ${url}, received ${response.status}`);
      }
      return await response.json();
    };

    const response = await this.retry(requestFunction);
    return response.stop;
  }

  async requestSearchId() {
    const url = `${this._apiBase}/search`;

    const requestFunction = async () => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Could not fetch ${url}, received ${response.status}`);
      }
      return await response.json();
    };

    const response = await this.retry(requestFunction);
    return response;
  }

  async requestTickets() {
    const searchId = localStorage.getItem('searchId');
    const url = `${this._apiBase}/tickets?searchId=${searchId}`;

    const requestFunction = async () => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Could not fetch ${url}, received ${response.status}`);
      }
      return await response.json();
    };

    const response = await this.retry(requestFunction);
    return response;
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
      ].map((el) => el < 10 ? `0${el}` : el)
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
