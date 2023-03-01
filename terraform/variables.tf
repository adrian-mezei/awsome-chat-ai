variable "lex_bot_id" {
  type        = string
  description = "The ID of the Lex chatbot."
}

variable "lex_bot_alias_id" {
  type        = string
  description = "The alias of the Lex chatbot."
}

variable "lex_locale_id" {
  type        = string
  default     = "en_US"
  description = "The locale ID of the Lex chatbot."
}