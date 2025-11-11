import { file } from "./file.interface";

export interface gist {
    name            : string,
    type            : string,
    version         : string,
    description     : string,
    file            : file[],
    created_at?     : Date,
    updated_at?     : Date,
    image_base64?   : string
}