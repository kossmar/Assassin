import Head from "next/head"
import Layout from "../common/components/Layout"
import { page } from '../constants'

export default function Rules() {

    return (
        <div>
            <Head>
                <title>Assassin/rules</title>
            </Head>
            <Layout page={page.rules}>
                <div className='py-10 px-5'>
                    <h1 className='underline font-bold'>
                        Concept
                    </h1>
                    <ul className='text-gray-600 pl-5 list-disc'>
                        <li>
                            Every player is an assassin. At least one player is a moderator
                        </li>
                        <li>
                            Every assassin is given one unique target
                        </li>
                        <img
                            className="flex justify-center py-20 w-2/5 mx-auto max-w-xs sm:max-w-sm lg:max-w-md"
                            src='/images/assassin-circle.png'
                        />
                        <li>
                            Once an assassin kills their target, the killer acquires the target's target
                        </li>
                        <img
                            className="flex justify-center py-20 w-2/5 mx-auto max-w-xs sm:max-w-sm lg:max-w-md"
                            src='/images/assassin-circle.png'
                        />
                        <li>
                            An assassin can only kill their target
                        </li>
                        <li>
                            An assassin may join after the game has begun, if the moderator allows it. The newcomer will only be given a target once an assassin has killed a target. The killer will be given the newcomer as a target and the newcomer will acquire the dead assassin's target
                        </li>
                        <li>
                            The game is over when there is one assassin left
                        </li>
                    </ul>
                </div>

                <div className='py-10 px-5'>
                    <h1 className='underline font-bold'>
                        Weapons
                    </h1>
                    <ul className='text-gray-600 pl-5 list-disc'>
                        <li>
                            A target can onl be killed with an allowed weapon
                        </li>
                        <li>
                            <p>The allowed weapons are set by the moderator(s)</p>
                            <ul className="text-gray-600 pl-5 list-disc">
                                <li>
                                    Common weapons include:
                                    <ul className="text-gray-600 pl-5 list-disc">
                                        <li>
                                            Spoon
                                        </li>
                                        <li>
                                            Tennis Ball
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>

                    </ul>
                </div>

                <div className='py-10 px-5'>
                    <h1 className='underline font-bold'>
                        Safe Zones
                    </h1>
                    <ul className='text-gray-600 pl-5 list-disc'>
                        <li>
                            Safe Zones are an optional rule that allow the game to be played more civilly
                        </li>
                        <li>
                            A target cannot be killed in a safe zone. If an assassin attempts a hit in a safe zone, this will simply inform the target who their assassin is, making them more difficult to kill
                        </li>
                        <li>
                            Common safe zones include: work places, schools, courts of law, funerals
                        </li>
                    </ul>
                </div>
                
                <div className='py-10 px-5'>
                    <h1 className='underline font-bold'>
                        Disputes
                    </h1>
                    <ul className='text-gray-600 pl-5 list-disc'>
                        <li>
                            Disputes wil be settled by the moderator
                        </li>
                        
                    </ul>
                </div>

                


            </Layout>
        </div>
    )
}