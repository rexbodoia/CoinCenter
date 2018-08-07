export const signup = newUser => (
  $.ajax({
    method: 'POST',
    url: '/api/users',
    data: { newUser }
  })
);

export const login = user => (
  $.ajax({
    method: 'POST',
    url: `api/session`,
    data: { user }
  })
);

export const logout = () => (
  $.ajax({
    method: 'DELETE',
    url: '/api/session'
  })
);
