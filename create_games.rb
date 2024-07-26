# frozen_string_literal: true

require "open-uri"
require "json"

TILE_SIZES = {
    8  => [2, 2, 2, 2],
    9  => [2, 2, 2, 3],
    10 => [2, 2, 3, 3],
    11 => [2, 3, 3, 3],
    12 => [3, 3, 3, 3]
}.freeze

dictionary     = URI.open("https://raw.githubusercontent.com/dolph/dictionary/master/popular.txt").read.split("\n")
dictionary_set = Set.new(dictionary)

dictionary.filter! { |word| (8..12).cover? word.size }
dictionary.shuffle!

all_games = []

catch :stop_finding_games do
  dictionary.each_slice(5) do |game_words|
    catch :find_next_game do
      tiles = Set.new
      game_words.each do |word|
        tile_sizes = TILE_SIZES[word.size].shuffle
        tile_sizes.each do |size|
          tile = word.slice!(0, size)
          throw :find_next_game if tiles.include?(tile)
          tiles << tile
        end
      end

      all_possible_words = Set.new
      all_fourtiles = tiles.to_a.permutation(4).map(&:join).filter { |word| dictionary_set.include?(word) }
      throw :find_next_game if all_fourtiles.size > 5
      all_possible_words.merge(all_fourtiles)

      (1..3).each do |tile_count|
        permutations = tiles.to_a.permutation(tile_count).map(&:join)
        all_possible_words.merge(permutations.filter { |word| dictionary_set.include?(word) })
      end

      throw :find_next_game unless all_possible_words.size >= 15

      all_games << {tiles: tiles.to_a, words: all_possible_words.to_a}
      puts "Added #{all_games.size}th game"
      # throw :stop_finding_games if all_games.size == 3
    end
  end
end

File.open("src/data/games.json", "w") { |f| f.puts JSON.pretty_generate(all_games) }
