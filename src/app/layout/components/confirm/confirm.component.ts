import {Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-confirm',
    templateUrl: './confirm.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./confirm.component.scss']
})

export class ConfirmComponent implements OnInit {
    closeResult: string;
    @Input() label: 'wdwds';
    @Input() bodyMessage: string = 'Deseja realmente deletar?';
    @Input() title: string = 'Confirme';
    @Input() classBtn: string = 'btn-danger';
    @Input() classIcon: string = 'btn-danger';
    @Input() titleBtn: string = 'Deletar';
    @Input() nameBtn: string = 'Excluir';
    @Input() id: any;
    @Input() declarationType?: any;
    @Input() user?: any;
    @Input() index?: any;
    @Output() responseConfirm = new EventEmitter();

    constructor(private modalService: NgbModal) {

    }

    ngOnInit() {

    }

    open(content) {
        this.modalService.open(content);
    }

    confirm(confirm) {
        this.modalService.dismissAll();
        this.responseConfirm.emit({
            'confirm': confirm, 'id': this.id, 'action': this.label,
            'declarationType': this.declarationType, 'user': this.user, 'index': this.index
        });
    }
}

