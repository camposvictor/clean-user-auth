import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('users')
export class DBUser {
  @PrimaryColumn()
  id: string

  @Column({
    type: 'varchar',
    length: 250,
  })
  name: string

  @Column({
    type: 'varchar',
    length: 250,
    unique: true,
  })
  email: string

  @Column({
    type: 'varchar',
  })
  password: string
}
