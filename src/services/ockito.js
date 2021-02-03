import { Octokit } from "@octokit/rest";

export default class OctoKit{
    constructor(){
        this.octokit = new Octokit({            
        });
        // auth: <> goes on the instantiation above
    }

    async getPublicGists(page, page_limit){
        const data = await this.octokit.gists.listPublic({
            page,
            per_page: page_limit
        });
        return data.data;
    }

    async getUsernameGists(username){
        const data = await this.octokit.gists.listForUser({
            username
        });
        return data.data;
    }

    async getGistComments(gistId){
        const data = await this.octokit.gists.listComments({
            gist_id: gistId
        });
        return data.data;
    }

}
