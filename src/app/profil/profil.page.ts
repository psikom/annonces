import { Component, OnInit } from '@angular/core';
import { AnnonceService } from '../annonce.service';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { Annonce } from '../annonce';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {
  userAnnonces$: Observable<Annonce[]>;
  authenticatedUser: any;

  constructor(
    private annonceService: AnnonceService,
    private authService: AuthService,
    private alertController: AlertController
  ) { }

  ngOnInit(): void {
    this.authenticatedUser = this.authService.getAuthenticatedUser();
    if (this.authenticatedUser) {
      this.userAnnonces$ = this.annonceService.getAnnoncesByUserId(this.authenticatedUser.id);
    }
  }

  async addAnnonce() {
    const alert = await this.alertController.create({
      header: 'Add New Announcement',
      inputs: [
        {
          name: 'titel',
          type: 'text',
          placeholder: 'Title'
        },
        {
          name: 'description',
          type: 'text',
          placeholder: 'Description'
        },
        {
          name: 'img',
          type: 'text',
          placeholder: 'Photo'
        },
        {
          name: 'price',
          type: 'number',
          placeholder: 'Price'
        },
        // choose category
        {
          name: 'category',
          type: 'checkbox',
          label: 'Houses',
          value: 'houses',
        },
        {
          name: 'category',
          type: 'checkbox',
          label: 'Garden',
          value: 'garden',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Addition cancelled');
          }
        },
        {
          text: 'Add',
          handler: async (formData) => {
            const newAnnonce: Annonce = {
              id: Math.floor(Math.random() * 1000000) + 1,
              userId: this.authenticatedUser.id,
              titel: formData.titel,
              description: formData.description,
              price: formData.price,
              img: formData.img,
              category: (formData.categories || []).join(','),
            };

            const addedAnnonce = await this.annonceService.addAnnonce(newAnnonce).toPromise();

            if (addedAnnonce) {
              console.log('Announcement added successfully');
            } else {
              console.error('Failed to add announcement');
            }
          }
        }
      ]
    });

    await alert.present();
  }


  async deleteAnnonce(annonceId: number) {
    const alert = await this.alertController.create({
      header: 'Confirm Deletion',
      message: 'Are you sure you want to delete this announcement?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Deletion canceled');
          },
        },
        {
          text: 'Delete',
          handler: async () => {
            const deletedAnnonce = await this.annonceService.deleteAnnonce(annonceId).toPromise();
            console.log('Deleted announcement:', deletedAnnonce);
          },
        },
      ],
    });

    await alert.present();
  }

  async updateAnnonce(annonceId: number) {
    const alert = await this.alertController.create({
      header: 'Update Announcement',
      inputs: [
        {
          name: 'titel',
          type: 'text',
          placeholder: 'New Title'
        },
        {
          name: 'description',
          type: 'text',
          placeholder: 'New Description'
        },
        {
          name: 'price',
          type: 'number',
          placeholder: 'New Price'
        },
        // choose category
        {
          name: 'category',
          type: 'checkbox',
          label: 'Houses',
          value: 'houses',
        },
        {
          name: 'category',
          type: 'checkbox',
          label: 'Garden',
          value: 'garden',
        },

      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Update cancelled');
          }
        },
        {
          text: 'Update',
          handler: async (formData) => {
            const updatedData = {
              titel: formData.titel,
              description: formData.description,
            };

            const result = await this.annonceService.updateAnnonce(annonceId, updatedData);

            if (result) {
              console.log('Announcement updated successfully');
            } else {
              console.error('Failed to update announcement');
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
