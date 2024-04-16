import UserService from './index';

global.fetch = jest.fn();

const mockFetch = jest.spyOn(global, 'fetch');

beforeEach(() => {
  mockFetch.mockClear();
});

describe('UserService', () => {
  let userService = new UserService()

  it('should get all users', async () => {

    await userService.getAll();

    expect(mockFetch).toHaveBeenCalledWith(userService.url, { method: "GET" });
  });

  it('should delete a user by id', async () => {
    const userId = 1;

    await userService.delete(userId);

    expect(mockFetch).toHaveBeenCalledWith(`${userService.url}/${userId}`, { method: "DELETE" });
  });

  it('should update an user', async () => {
    const user = { id: 1, name: 'Teste', email: 'testing@gmail.com', password: 'password', job: 'Tester', avatar: 'https://myavatar/avatar.png' };

    await userService.updateUser(user);

    expect(mockFetch).toHaveBeenCalledWith(`${userService.url}/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
  });

  it('deve criar um usuário', async () => {
    const user = { id: 1, name: 'Teste', email: 'testing@gmail.com', password: 'password', job: 'Tester', avatar: 'https://myavatar/avatar.png' };

    await userService.create(user);

    expect(mockFetch).toHaveBeenCalledWith(userService.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
  });
});
