import { Character } from "./character.model";
import { Creator } from "./creator.model";

export interface Comic {
    id?: number;
    titulo: string;
    descricao: string;
    data_publicacao: Date;
    capa_url: string;
    creators: Creator[];
    characters: Character[];
}