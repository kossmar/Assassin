import { useGameContext } from "../contexts/GameContext"
import EditGameDetails from '../components/EditGameDetails'
import ChooseRole from '../components/ChooseRole'


export default function GameDetails() {

    const [gameContext, handleRoleSelect, updateDetails] = useGameContext()

    if (!gameContext.userState.isEditing) {
        return (
            <>
                <div className={'w-96 mx-auto pt-16 space-y-10 text-center'}>
                    <div className='border-yellow-200 border-2 bg-gray-100 space-y-10 py-10 rounded-xl'>
                        <div>
                            <div className='font-bold'>
                                NAME:
                            </div>
                            <div>
                                {gameContext.gameDetails.game_name}
                            </div>
                        </div>

                        <div>
                            <div className='font-bold'>
                                WEAPONS:
                            </div>
                            <div>
                                {gameContext.gameDetails.weapons}
                            </div>
                        </div>

                        <div>
                            <div className='font-bold'>
                                SAFE ZONES:
                            </div>
                            <div>
                                {gameContext.gameDetails.safe_zones}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
                <EditGameDetails onChange={updateDetails} details={gameContext.gameDetails} />

                <ChooseRole onClick={handleRoleSelect} selectedRole={gameContext.userState.roleSelection} />
            </>
        )
    }

}