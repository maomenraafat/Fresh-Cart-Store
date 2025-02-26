import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
  viewChild,
} from '@angular/core';
import { OrderService } from '../../../shared/services/order/order.service';
// import { jwtDecode } from 'jwt-decode';
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
  // userId!: string;

  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 5; // Number of items to display per page
  totalPages: number = 0;
  paginatedOrders: Order[] = [];
  ngOnInit(): void {
    // this.getUserOrders();
    this.getUserId();
  }

  getUserId() {
    // const token = jwtDecode(localStorage.getItem('userToken')!);
    // this.userId = token.id;
    // console.log(this.userId);
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

  handleModalClick(id: string) {
    console.log('he', id);
    this.modalId = id;
  }



  // Update pagination logic
  updatePagination() {
    this.totalPages = Math.ceil(this.ordersList.length / this.itemsPerPage);
    this.paginateOrders();
  }

  // Slice the ordersList to display only the current page's items
  paginateOrders() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedOrders = this.ordersList.slice(startIndex, endIndex);
  }

  // Change page
  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return; // Prevent invalid page numbers
    this.currentPage = page;
    this.paginateOrders();
  }

  // Method to open the modal and set the selected order
  // Method to open the modal
  openModal(order: Order) {
    this.selectedOrder = order;
    this.showModal();
  }

  // Method to close the modal
  closeModal() {
    this.selectedOrder = {} as Order;
    this.hideModal();
  }

  // Helper method to show the modal
  private showModal() {
    const modal = this.defaultModal.nativeElement;
    modal.classList.remove('hidden');
  }

  // Helper method to hide the modal
  private hideModal() {
    const modal = this.defaultModal.nativeElement;
    modal.classList.add('hidden');
  }
}
