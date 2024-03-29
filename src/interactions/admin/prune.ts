import {
	ChannelType,
	CommandInteraction,
	SlashCommandIntegerOption
} from "discord.js";
import Interaction from "../../libs/structures/Interaction";

export default class Avatar extends Interaction {
	name = "prune";
	description = "Prune up to 99 messages.";
	intOp = new SlashCommandIntegerOption()
		.setName("amount")
		.setDescription("number of messages")
		.setRequired(true);
	options = [this.intOp];

	async execute(interaction: CommandInteraction) {
		try {
			if (!interaction.isChatInputCommand()) return;

			const amount = interaction.options.getInteger("amount");

			if (!amount || amount < 1 || amount >= 100) {
				await interaction.reply({
					content: "Input must be a number between 1 and 99."
				});
			} else if (interaction.channel?.type === ChannelType.GuildText) {
				await interaction.channel.bulkDelete(amount, true);
				await interaction.reply({
					content: `Successfully pruned ${amount} messages`,
					ephemeral: true
				});
			}
		} catch (error) {
			console.error(error);
			interaction.reply({
				content: "There was an error trying to prune messages in this channel!",
				ephemeral: true
			});
		}
		return;
	}
}
