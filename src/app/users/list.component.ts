import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';

import { MessageService, UserService } from '@app/_services';
import { ModalComponent, ModalConfig } from '@app/_components';
import { Message, Header } from '@app/_models';
@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
  users = null;
  user = null;
  @ViewChild('modal') private modal: ModalComponent;

  public modalConfig: ModalConfig = {
    modalTitle: '',
    onDismiss: () => {
      this.user = null;
      return true;
    },
    onClose: () => {
      return true;
    },
  };

  constructor(
    private userService: UserService,
    private msgSrv: MessageService
  ) {}

  ngOnInit() {
    this.userService
      .getAll()
      .pipe(first())
      .subscribe((users) => (this.users = users));

    this.msgSrv.receive().subscribe((msg) => {
      if (msg.header === 'directive' && msg.content === 'x') {
        this.closeModal();
      }
    });
  }

  onModal(user) {
    this.msgSrv.send({ header: 'user_data', content: user });
    this.openModal();
  }

  async openModal() {
    return await this.modal.open();
  }

  async closeModal() {
    return await this.modal.close();
  }

  deleteUser(id: string) {
    const user = this.users.find((x) => x.id === id);
    user.isDeleting = true;
    this.userService
      .delete(id)
      .pipe(first())
      .subscribe(() => (this.users = this.users.filter((x) => x.id !== id)));
  }
}
