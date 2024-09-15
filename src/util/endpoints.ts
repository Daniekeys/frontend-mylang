

/** this would wrap all the api endpoints and base urls */
export const baseUrl = "https://mylangcoach-api.onrender.com/api/v1";

export const url = {
  login: "/auth/signin",
  register: "/auth/signup",
  resendVerification: "/auth/resend-verification-email",
  socialRegister: "/auth/social-register",
  socialLogin: "/auth/social-login",
  logout: "/auth/logout",
  verifyUserEmail: "/auth/verify-email",
  offerings: "/offerings",
  getOfferings: "/offerings/all",
  userProfile: "/users/profile",
  allUser: "/users/all",
  user: "/users",
  sessionBookings: "/bookings/session",
  offeringBookings: "/bookings/offering",
  saveCard: "/payments/save-card",
  savedCard: "/users/my/cards",
  allMyStudent: "/users/coach/mytopstudents",
  payment: "/payments",
  userBanks: "/users/my/banks",
  bookNextSession: "/bookings/next-session",
  transactions: "/transactions",
  reschedule: "/reschedules/booking",
  allReschedules: "/reschedules/my-pendings",
  respondToReschedule: "/reschedules",
  availability: "/bookings/availability",
  coachByLang: "/users/coaches/by-lang",
  stats: "/users/my/dashboardstats",
};
