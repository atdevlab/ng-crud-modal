import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Message, Header } from '@app/core/models';

@Injectable({ providedIn: 'root' })
export class MessageService {
  private message = new BehaviorSubject<Message>({
    header: '', // directive, data
    content: null,
  });

  send(msg: Message) {
    this.message.next(msg);
  }

  receive() {
    return this.message.asObservable();
  }
}
