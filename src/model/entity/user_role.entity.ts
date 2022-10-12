import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'tb_user_role' })
export class UserRole extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
  })
  @ApiProperty()
  id: number;

  @Column({
    type: 'bigint',
    unsigned: true,
    comment: '用户id',
  })
  @ApiProperty()
  user_id: number;

  @Column({
    type: 'int',
    unsigned: true,
    comment: '角色id',
  })
  @ApiProperty()
  role_id: number;
}
