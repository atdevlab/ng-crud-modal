import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';

import { UserService } from '@app/_services';
import { ModalComponent, ModalConfig } from '@app/_components';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
  users = null;
  user = null;
  @ViewChild('modal') private modal: ModalComponent;

  public modalConfig: ModalConfig = {
    modalTitle: '',
    onDismiss: () => {
      this.user = null;
      console.log('dismiss');
      return true;
    },
    onClose: () => {
      console.log('close');
      return true;
    },
  };

  constructor(private userService: UserService) {}

  async openModal(user?) {
    // console.log(user);
    if (user !== undefined) {
      this.user = user;
    }
    return await this.modal.open();
  }

  ngOnInit() {
    this.userService
      .getAll()
      .pipe(first())
      .subscribe((users) => (this.users = users));
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
