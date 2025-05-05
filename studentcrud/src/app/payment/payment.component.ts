import { Component, OnInit, inject, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Database, ref, set, onValue, push, remove } from '@angular/fire/database';

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
  paymentList: any[] = [];

  selectedInternId: string = '';
  editingPaymentKey: string | null = null;

  private db = inject(Database);
  private ngZone = inject(NgZone);

  ngOnInit(): void {
    
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
 
    const payRef = ref(this.db, 'payments/');
    onValue(payRef, (snapshot) => {
      this.ngZone.run(() => {
        const payments = snapshot.val();
        this.paymentList = [];
        if (payments) {
          for (let key in payments) {
            this.paymentList.push({
              key: key,
              ...payments[key]
            });
          }
        }
      });
    });
  }
  savePayment() {
    if (!this.selectedInternId || !this.data.name) {
      alert('Please select an intern and ensure name is filled before making payment.');
      return;
    }
  
    // Create payment key using name and ID (same format as in intern node)
    const paymentKey = ` ${this.selectedInternId}`;
  
    const paymentData = {
      ...this.data,
      name: this.data.name
    };
  
    // Use set() instead of push() to store payment under custom key
    const payRef = ref(this.db, 'payments/' + paymentKey);
    set(payRef, paymentData)
      .then(() => {
        alert(this.editingPaymentKey ? 'Payment updated successfully!' : 'Payment saved successfully!');
        this.resetForm();
      })
      .catch((error) => {
        console.error('Error saving payment data: ', error);
      });
  }
  
  editPayment(payment: any) {
    this.editingPaymentKey = payment.key;
    this.data = {
      name: payment.name,
      domain: payment.domain,
      amount: payment.amount,
      paymentDate: payment.paymentDate,
      mode: payment.mode
    };

    const matchedIntern = this.internList.find(i => i.name === payment.name);
    if (matchedIntern) {
      this.selectedInternId = matchedIntern.id;
    }
  }

  deletePayment(key: string) {
    const confirmDelete = confirm("Are you sure you want to delete this payment?");
    if (!confirmDelete) return;

    const paymentRef = ref(this.db, `payments/${key}`);
    remove(paymentRef)
      .then(() => {
        alert('Payment deleted successfully!');
      })
      .catch((error) => {
        console.error('Error deleting payment:', error);
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
    this.editingPaymentKey = null;
  }
}
