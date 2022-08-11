import { User } from 'src/users/entities/user.entity';
import {
  BeforeInsert,
  AfterInsert,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class PetAd {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  spaceName: string; // popup, above footer, under-services.

  @Column()
  agent: string; // smart Phone, Tablets, Desktops.

  @Column()
  description: string; // description of the ad. SHOW ONLY ON DESKTOP.

  @Column()
  startDate: Date; // Start date of the ad.

  @Column()
  endDate: Date; // End date of the ad.

  @Column()
  imageOrVideo: string; // Relative path of the image.

  @Column({ default: true })
  isVisibile: boolean; // Is the ad visible or not.

  @Column({ default: 0 })
  views: number;

  @ManyToOne(() => User, (user) => user.petAd)
  // @JoinColumn()
  user: User;

  @BeforeInsert()
  runBeforeInsert() {
    // if the start date is after the end date, then set the end date to the start date.
    if (this.startDate > this.endDate) {
      [this.endDate, this.startDate] = [this.startDate, this.endDate];
    }
  }

  @AfterInsert()
  runAfterInsert() {
    // success message.
    console.log('Pet Ad inserted successfully.');
  }
}
