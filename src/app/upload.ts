export class Upload {

    $key:string;
    file:File;
    song:string;
    name:string;
    artist:string;
    album:string;
    albumart:string;
    progress:number;
    createdAt: Date = new Date();

    constructor(file:File){
        this.file = file;
    }
}
