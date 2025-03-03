import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { OrderService } from '../../../shared/services/order/order.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { CartItem, Order } from '../../../shared/interfaces/order';

@Component({
  selector: 'app-orders',
  imports: [],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
  @ViewChild('defaultModal') defaultModal!: ElementRef;
  selectedOrder!: Order;
  modalId!: string;
  ordersList!: Order[];
  cartItems!: CartItem[];
  _orderService = inject(OrderService);
  _authService = inject(AuthService);
 

  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 5; 
  totalPages: number = 0;
  paginatedOrders: Order[] = [];
  ngOnInit(): void {
    this.getUserId();
  }

  getUserId() {
    const token = this._authService.userData.getValue();
    console.log(token.id);
    this.getUserOrders(token.id);
  }

  getUserOrders(id: string) {
    this._orderService.getUserOrders(id).subscribe({
      next: (res) => {
        console.log(res);
        this.ordersList = res;
        this.cartItems = res.cartItems;
        this.updatePagination();
      },
    });
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.ordersList.length / this.itemsPerPage);
    this.paginateOrders();
  }

 
  paginateOrders() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedOrders = this.ordersList.slice(startIndex, endIndex);
  }


  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return; 
    this.currentPage = page;
    this.paginateOrders();
  }


  openModal(order: Order) {
    this.selectedOrder = order;
    this.showModal();
  }


  closeModal() {
    this.selectedOrder = {} as Order;
    this.hideModal();
  }


  private showModal() {
    const modal = this.defaultModal.nativeElement;
    modal.classList.remove('hidden');
  }


  private hideModal() {
    const modal = this.defaultModal.nativeElement;
    modal.classList.add('hidden');
  }
}
