const USERS_KEY = "pixel_store_users";
const CURRENT_USER_KEY = "pixel_store_current_user";
const TOKEN_KEY = "token";

const defaultUsers = [
  {
    _id: "u-guest",
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@gmail.com",
    password: "cooljohndoe",
    cart: [],
    wishlist: [],
  },
];

const createHttpError = (status, errors) => ({
  response: { status, data: { errors: [errors] } },
});

const getUsers = () => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || "null");
  if (users) return users;
  localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
  return defaultUsers;
};

const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const setCurrentUser = (user) => {
  localStorage.setItem(CURRENT_USER_KEY, user.email);
};

const getCurrentUserEmail = () => localStorage.getItem(CURRENT_USER_KEY);

const getToken = () => localStorage.getItem(TOKEN_KEY);

const requireAuthUser = () => {
  const users = getUsers();
  const email = getCurrentUserEmail();
  const token = getToken();
  const user = users.find((item) => item.email === email);
  if (!user || !token) throw createHttpError(500, "Please login");
  return { users, user };
};

const updateUser = (updatedUser) => {
  const users = getUsers();
  const nextUsers = users.map((item) =>
    item.email === updatedUser.email ? updatedUser : item
  );
  saveUsers(nextUsers);
};

export const loginLocalUser = (loginData) => {
  const users = getUsers();
  const foundUser = users.find((user) => user.email === loginData.email);
  if (!foundUser || foundUser.password !== loginData.password) {
    throw createHttpError(401, "Invalid credentials");
  }
  const encodedToken = `local-token-${Date.now()}`;
  localStorage.setItem(TOKEN_KEY, encodedToken);
  setCurrentUser(foundUser);
  return { encodedToken, foundUser };
};

export const signupLocalUser = (signupData) => {
  const users = getUsers();
  if (users.some((user) => user.email === signupData.email)) {
    throw createHttpError(422, "Email already exists");
  }
  const user = {
    _id: `u-${Date.now()}`,
    firstName: signupData.firstName,
    lastName: signupData.lastName,
    email: signupData.email,
    password: signupData.password,
    cart: [],
    wishlist: [],
  };
  const nextUsers = [...users, user];
  saveUsers(nextUsers);
  const encodedToken = `local-token-${Date.now()}`;
  localStorage.setItem(TOKEN_KEY, encodedToken);
  setCurrentUser(user);
  return { encodedToken, createdUser: user };
};

export const getLocalCart = () => {
  const { user } = requireAuthUser();
  return user.cart || [];
};

export const getLocalWishlist = () => {
  const { user } = requireAuthUser();
  return user.wishlist || [];
};

export const addToLocalCart = (product) => {
  const { user } = requireAuthUser();
  const cart = user.cart || [];
  if (cart.some((item) => item._id === product._id)) {
    return cart;
  }
  const nextUser = { ...user, cart: [...cart, { ...product, quantity: 1 }] };
  updateUser(nextUser);
  return nextUser.cart;
};

export const addToLocalWishlist = (product) => {
  const { user } = requireAuthUser();
  const wishlist = user.wishlist || [];
  if (wishlist.some((item) => item._id === product._id)) {
    throw createHttpError(409, "Already in wishlist");
  }
  const nextUser = { ...user, wishlist: [...wishlist, product] };
  updateUser(nextUser);
  return nextUser.wishlist;
};
