// utils/storage.ts

export interface User {
  email: string;
  password: string;
  name: string;
}

export interface Ticket {
  from: string;
  to: string;
  departureDate: string;
  returnDate?: string;
  price: number;
}

const USERS_KEY = 'users';
const ACTIVE_USER_KEY = 'activeUser';
const TICKETS_KEY = 'tickets';

type TicketMap = {
  [email: string]: Ticket[];
};

const defaultUsers: User[] = [
  {
    email: 'demo@airline.com',
    password: '123456',
    name: 'Demo Kullanıcı',
  },
];

export function initializeStorage(): void {
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
  }
  if (!localStorage.getItem(TICKETS_KEY)) {
    localStorage.setItem(TICKETS_KEY, JSON.stringify({}));
  }
}

export function getUsers(): User[] {
  return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
}

export function saveUser(user: User): void {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getActiveUser(): User | null {
  const user = localStorage.getItem(ACTIVE_USER_KEY);
  return user ? JSON.parse(user) : null;
}

export function setActiveUser(user: User): void {
  localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(user));
}

export function logoutUser(): void {
  localStorage.removeItem(ACTIVE_USER_KEY);
}

export function getTickets(email: string): Ticket[] {
  const allTickets: TicketMap = JSON.parse(localStorage.getItem(TICKETS_KEY) || '{}');
  return allTickets[email] || [];
}

export function getTicketsByUser(email: string) {
  const allTickets = JSON.parse(localStorage.getItem("tickets") || "{}");
  return allTickets[email] || [];
}

// Yeni bilet kaydet
export function saveTicket(email: string, ticket: any) {
  const allTickets = JSON.parse(localStorage.getItem("tickets") || "{}");
  const userTickets = allTickets[email] || [];
  userTickets.push(ticket);
  allTickets[email] = userTickets;
  localStorage.setItem("tickets", JSON.stringify(allTickets));
}