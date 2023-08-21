type status = "alive" | "dead";

export default class Cel {
    status: status = "dead";

    SetStatusToAlive = () => {
        this.status = "alive";
    }
    SetStatusToDead = () => {
        this.status = "dead";
    }
}
