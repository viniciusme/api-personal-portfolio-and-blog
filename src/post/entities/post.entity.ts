import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/user/entities';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  slug!: string;

  @Column({ type: 'varchar', length: 150 })
  title!: string;

  @Column({ type: 'varchar', length: 255 })
  excerpt?: string;

  @Column({ type: 'text' })
  content!: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  category: string;

  @Column({ type: 'simple-array' })
  tags: string[];

  @Column({ type: 'bool', default: true })
  status: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.posts, { eager: true })
  @JoinColumn({ name: 'author' })
  author: User;
}
