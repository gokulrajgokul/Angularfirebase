import { Component, OnInit, inject, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Database, ref, set, onValue } from '@angular/fire/database';
import { push } from '@angular/fire/database';

export interface Payment {
  name: string;
  domain: string;
  amount: number;
  paymentDate: string;
  mode: string;
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class PaymentComponent implements OnInit {
  data: Payment = {
    name: '',
    domain: '',
    amount: 0,
    paymentDate: '',
    mode: ''
  };

  internList: any[] = [];
  paymentList: Payment[] = [];

  selectedInternId: string = ''; // <-- store selected internId

  private db = inject(Database);
  private ngZone = inject(NgZone);

  ngOnInit(): void {
    // Fetch interns
    const internRef = ref(this.db, 'intern/');
    onValue(internRef, (snapshot) => {
      this.ngZone.run(() => {
        const data = snapshot.val();
        this.internList = [];
        if (data) {
          for (let key in data) {
            this.internList.push(data[key]);
          }
        }
      });
    });

    // Fetch payments
    const payRef = ref(this.db, 'payments/');
    onValue(payRef, (snapshot) => {
      this.ngZone.run(() => {
        const payments = snapshot.val();
        this.paymentList = [];
        if (payments) {
          for (let key in payments) {
            this.paymentList.push(payments[key]);
          }
        }
      });
    });
  }

  
savePayment() {
  if (!this.selectedInternId) {
    alert('Please select an intern before making payment.');
    return;
  }

  const payRef = ref(this.db, 'payments/');
  const paymentData = {
    ...this.data,
    name: this.selectedInternId // Save name from dropdown
  };

  push(payRef, paymentData)
    .then(() => {
      alert('Payment saved successfully!');
      this.resetForm();
    })
    .catch((error) => {
      console.error('Error saving payment data: ', error);
    });
}

onInternChange() {
  const selected = this.internList.find(intern => intern.id === this.selectedInternId);
  if (selected) {
    this.data.name = selected.name;
    this.data.domain = selected.domain;
  }
}
 

  resetForm() {
    this.data = {
      name: '',
      domain: '',
      amount: 0,
      paymentDate: '',
      mode: ''
    };
    this.selectedInternId = '';
  }
}
