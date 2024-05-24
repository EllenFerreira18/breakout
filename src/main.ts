import { Actor, CollisionType, Color, Engine, vec } from "excalibur"
import { vector } from "excalibur/build/dist/Util/DrawUtil"

const game = new Engine({
	width: 800,
	height: 600
})

const barra = new Actor({
	x: 150,
	y: game.drawHeight - 40, 
	width: 200,
	height: 20,
	color: Color.Chartreuse
})

barra.body.collisionType = CollisionType.Fixed

game.add(barra)

game.input.pointers.primary.on("move", (event) => {
	barra.pos.x = event.worldPos.x
})

const bolinha = new Actor({
	x: 100,
	y: 300,
	radius: 10,
	color: Color.Red
})

bolinha.body.collisionType = CollisionType.Passive

const velocidadeBolinha = vec(100, 100)

setTimeout(() => {
	bolinha.vel = velocidadeBolinha
}, 1000)

bolinha.on("postupdate", () => {
	if (bolinha.pos.x < bolinha.width / 2) {
		bolinha.vel.x = velocidadeBolinha.x
	}

	if (bolinha.pos.x + bolinha.width / 2 > game.drawWidth) {
		bolinha.vel.x = -velocidadeBolinha.x
	}

	if (bolinha.pos.y < bolinha.height / 2) {
		bolinha.vel.y = velocidadeBolinha.y
	}

	if (bolinha.pos.y + bolinha.height / 2 > game.drawHeight) {
		bolinha.vel.y = -velocidadeBolinha.y
	}
})

game.add(bolinha)

const padding = 20

const xoffset = 65
const yoffset = 20

const colunas = 5
const linhas = 3

const corBloco = [Color.Violet, Color.Orange, Color.Yellow]

const larguraBloco = (game.drawWidth / colunas) - padding - (padding / colunas)
const alturaBloco = 30

const listaBlocos: Actor[] = []

game.start()