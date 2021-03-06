import
{
    CharacterStateBase,
    Falling
} from './_stateLibrary';

export class JumpIdle extends CharacterStateBase
{
    constructor(character)
    {
        super(character);

        this.character.velocitySimulator.mass = 50;

        this.character.setArcadeVelocityTarget(0);
        this.animationLength = this.character.setAnimation('jump_idle', 0.1);
        this.alreadyJumped = false;
    }

    update(timeStep)
    {
        super.update(timeStep);

        // Move in air
        if (this.alreadyJumped)
        {
            this.character.setCameraRelativeOrientationTarget();
            this.character.setArcadeVelocityTarget(this.anyDirection() ? 0.8 : 0);
        }
        this.character.update(timeStep);

        //Physically jump
        if (this.timer > 0.2 && !this.alreadyJumped)
        {
            this.character.jump();
            this.alreadyJumped = true;

            this.character.velocitySimulator.mass = 100;
            this.character.rotationSimulator.damping = 0.3;
            this.character.setArcadeVelocityInfluence(0.3, 0, 0.3);
        }
        else if (this.timer > 0.3 && this.character.rayHasHit)
        {
            this.setAppropriateDropState();
        }
        else if (this.timer > this.animationLength - timeStep)
        {
            this.character.setState(Falling);
        }
    }
}