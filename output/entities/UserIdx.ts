import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";

@Index("choo", ["choo"], {})
@Entity("user_idx", { schema: "yundb" })
export class UserIdx {
  @Column("char", { primary: true, name: "id", length: 16 })
  id: string;

  @Column("varchar", { name: "name", nullable: true, length: 16 })
  name: string | null;

  @Column("datetime", { name: "last_visit", nullable: true })
  lastVisit: Date | null;

  @Column("decimal", { name: "money", nullable: true, precision: 10, scale: 0 })
  money: string | null;

  @Column("char", { name: "choo", nullable: true, length: 16 })
  choo: string | null;

  @ManyToOne(() => UserIdx, (userIdx) => userIdx.userIdxes, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "choo", referencedColumnName: "id" }])
  choo2: UserIdx;

  @OneToMany(() => UserIdx, (userIdx) => userIdx.choo2)
  userIdxes: UserIdx[];
}
