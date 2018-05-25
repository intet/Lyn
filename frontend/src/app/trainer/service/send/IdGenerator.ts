export class IdGenerator {
    private static transportId: number = -1;

    public static generateTransportId(): number {
        IdGenerator.transportId -= 1;
        return IdGenerator.transportId;
    }

}