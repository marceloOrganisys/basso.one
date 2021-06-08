new Vue({
	el: '#game',
	data: {
		playing: false,
		pLife: 100,
		mLife: 100,
		actions: [],
		winner: ''
	},
	methods: {
		random(min, max) {
			return Math.floor(Math.random() * (max - min) + min);
		},
		attack() {
			let pAttack = this.random(7, 15)
			let mAttack = this.random(10, 20)

			this.pLife -= mAttack
			if (this.pLife <= 0) {
				this.pLife = 0
				this.end()
			}

			this.mLife -= pAttack
			if (this.mLife <= 0) {
				this.mLife = 0
				this.end()
			}

			this.actions.push({action: 'attack', value: pAttack, origin: 'p'})
			this.actions.push({action: 'attack', value: mAttack, origin: 'm'})
		},
		specialAttack() {
			let pAttack = this.random(12, 17)
			let mAttack = this.random(10, 15)

			this.pLife -= mAttack
			if (this.pLife <= 0) {
				this.pLife = 0
				this.end()
			}

			this.mLife -= pAttack
			if (this.mLife <= 0) {
				this.mLife = 0
				this.end()
			}

			this.actions.push({action: 'attack', value: pAttack, origin: 'p'})
			this.actions.push({action: 'attack', value: mAttack, origin: 'm'})
			
		},
		heal() {
			let life = this.random(5, 12)
			let attack = this.random(6, 10)
			this.pLife += life - attack
			if (this.pLife > 100) {
				this.pLife = 100
			}
			this.actions.push({action: 'heal', value: life, origin: 'p'})
			this.actions.push({action: 'attack', value: attack, origin: 'm'})
		},
		run() {
			this.pLife = 100
			this.mLife = 100
			this.playing = false
			this.actions = []
		},
		message(action) {
			let message = 'the ' + (action.origin == 'p' ? 'player ' : 'monster ') + action.action + 'ed '
			if (action.action == 'attack' && action.origin == 'm') {
				message += ', the player lost ' + action.value + ' points of life'
			}
			if (action.action == 'heal') {
				message += 'and regained ' + action.value + ' points of life'
			}
			if (action.action == 'attack' && action.origin == 'p') {
				message += ', the monster lost ' + action.value + ' points of life'
			}
			return message
		},
		end() {
			if (this.pLife > 0) {
				this.winner = 'p'
			} else {
				this.winner = 'm'
			}
		}
	}
})