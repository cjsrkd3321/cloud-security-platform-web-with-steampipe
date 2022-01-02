import bcrypt from 'bcryptjs/dist/bcrypt';
import User from '../models/User';

export const home = async (req, res) => {
  res.render('home', { pageTitle: 'Home' });
};

export const getJoin = (req, res) => res.render('join', { pageTitle: 'Join' });

export const postJoin = async (req, res) => {
  const { username, password, passwordConfirmation } = req.body;
  const pageTitle = 'Join';
  if (password !== passwordConfirmation) {
    return res.status(400).render('join', {
      pageTitle,
      errorMessage: 'Password confirmation does not match.',
    });
  }

  try {
    const exists = await User.exists({ username });
    if (exists) {
      return res.status(400).render('join', {
        pageTitle,
        errorMessage: 'This username is already taken.',
      });
    }

    await User.create({
      username,
      password,
    });
  } catch (error) {
    return res.status(400).render('join', {
      pageTitle,
      errorMessage: `[user][postJoin] ${error}`,
    });
  }

  return res.redirect('/login');
};

export const getLogin = (req, res) =>
  res.render('login', { pageTitle: 'Login' });

export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const pageTitle = 'Login';
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).render('login', {
      pageTitle,
      errorMessage: 'An account with this username does not exist.',
    });
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render('login', {
      pageTitle,
      errorMessage: 'Username or password is wrong.',
    });
  }

  req.session.loggedIn = true;
  req.session.user = user;

  return res.redirect('/');
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect('/login');
};
