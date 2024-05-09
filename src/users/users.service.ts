import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Johnny Sins',
      email: 'Johhny.Sins@test',
      role: 'INTERN',
    },
    {
      id: 2,
      name: 'Walter White',
      email: 'Walter.White@test',
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'Ozjasz Goldberg',
      email: 'Ozjasz.Goldberg@test',
      role: 'ENGINEER',
    },
    {
      id: 4,
      name: 'Erwin Rommel',
      email: 'Erwin.Rommel@test',
      role: 'ENGINEER',
    },
    {
      id: 5,
      name: 'Ahmed Hinsel',
      email: 'Ahmed.Hinsel@test',
      role: 'ADMIN',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);
      if (rolesArray.length === 0) {
        throw new NotFoundException('User role not found');
        return rolesArray;
      }
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  create(createUserDto: CreateUserDto) {
    const usersByHighestID = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestID[0].id + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updatedUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedUserDto };
      }
      return user;
    });

    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);

    this.users = this.users.filter((user) => user.id !== id);

    return removedUser;
  }
}
