import {PhotoDTO} from '../../../common/entities/PhotoDTO';
import {Utils} from '../../../common/Utils';
import {Config} from '../../../common/config/public/Config';
import {MediaDTO} from '../../../common/entities/MediaDTO';

export class MediaIcon {


  protected replacementSizeCache: number | boolean = false;

  constructor(public media: MediaDTO) {

  }

  iconLoaded() {
    this.media.readyIcon = true;
  }

  isIconAvailable() {
    return this.media.readyIcon;
  }

  getIconPath() {
    return Utils.concatUrls(Config.Client.urlBase,
      '/api/gallery/content/',
      this.media.directory.path, this.media.directory.name, this.media.name, 'icon');
  }

  getPhotoPath() {
    return Utils.concatUrls(Config.Client.urlBase,
      '/api/gallery/content/',
      this.media.directory.path, this.media.directory.name, this.media.name);
  }


  equals(other: PhotoDTO | MediaIcon): boolean {
    // is gridphoto
    if (other instanceof MediaIcon) {
      return this.media.directory.path === other.media.directory.path &&
        this.media.directory.name === other.media.directory.name && this.media.name === other.media.name;
    }

    // is media
    if (other.directory) {
      return this.media.directory.path === other.directory.path &&
        this.media.directory.name === other.directory.name && this.media.name === other.name;
    }

    return false;
  }
}