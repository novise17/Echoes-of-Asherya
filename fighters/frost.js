import { Fighter } from "./Fighter.js";

import { CryoLance } from "../abilities/ice/cryoLance.js";
import { ZeroField } from "../abilities/ice/zeroField.js";
import { CrystalWall } from "../abilities/ice/crystalWall.js";
import { PermafrostChains } from "../abilities/ice/permafrostChains.js";
import { AbsoluteZero } from "../abilities/ice/absoluteZero.js";

export class Frost extends Fighter {
    constructor(x, color, controls) {
        super("Frost", x, color, controls);

        this.abilities = {
            q: new CryoLance(),
            w: new ZeroField(),
            e: new CrystalWall(),
            r: new PermafrostChains(),
            f: new AbsoluteZero()
        };
    }
}
