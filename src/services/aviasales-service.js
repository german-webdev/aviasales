/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-continue */
export default class AviasalesService {
  _apiBase = 'https://aviasales-test-api.kata.academy';

  constructor() {
    this.getSearchId = () => {
      this.requestSearchId().then((id) => {
        localStorage.setItem('searchId', id.searchId);
      });
    };
  }

  requestFunction = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, received ${response.status}`);
    }
    return await response.json();
  };

  async retry(requestFunction, maxAttempts = 5) {
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

  async requestSearchId() {
    const url = `${this._apiBase}/search`;
    const response = await this.retry(() => this.requestFunction(url));
    return response;
  }

  async requestData() {
    const searchId = localStorage.getItem('searchId');
    const url = `${this._apiBase}/tickets?searchId=${searchId}`;
    const response = searchId && (await this.retry(() => this.requestFunction(url)));
    return response;
  }

  async getData() {
    const data = await this.requestData();
    return this._transformDataTickets(data);
  }

  _getLogo = (carrier) => {
    return `https://pics.avs.io/99/36/${carrier}.png`;
  };

  _getTimeOfPath = (date, duration) => {
    const depDate = new Date(date);
    const arrivDate = new Date(Date.parse(date) + duration * 60000);
    const getTime = (anyDate) => {
      const time = [anyDate.getHours(), anyDate.getMinutes()].map((el) => (el < 10 ? `0${el}` : el)).join(':');
      return time;
    };

    const depTime = getTime(depDate);
    const arrivTime = getTime(arrivDate);
    return `${depTime} - ${arrivTime}`;
  };

  _transformDataTickets = (data) => {
    return {
      stop: data.stop,
      tickets: data.tickets.map((ticket) => this._transformTickets(ticket)),
    };
  };

  _transformTickets = (ticket) => {
    return {
      price: ticket.price,
      logo: this._getLogo(ticket.carrier),
      segments: ticket.segments.map((body) => this._transformBodyTickets(body)),
    };
  };

  _transformBodyTickets = (body) => {
    return {
      from: body.origin,
      to: body.destination,
      timeOfPath: this._getTimeOfPath(body.date, body.duration),
      duration: body.duration,
      stops: body.stops,
    };
  };
}

const loadId = new AviasalesService();

loadId.getSearchId();
