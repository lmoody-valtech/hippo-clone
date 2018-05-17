package uk.nhs.digital.ps.chart;

import static java.util.Collections.singletonList;

import org.apache.jackrabbit.JcrConstants;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.hippoecm.hst.content.beans.standard.HippoResource;
import uk.nhs.digital.ps.beans.ChartSection;
import uk.nhs.digital.ps.chart.model.Series;
import uk.nhs.digital.ps.chart.model.Point;

import java.io.InputStream;
import java.util.*;
import javax.jcr.Binary;

public class ChartFactory {
    private static final int CATEGORIES_INDEX = 0;

    private final ChartType type;
    private final String title;
    private final String yTitle;
    private final HippoResource dataFile;

    private List<String> categories;
    private HashMap<Integer, Series> series;

    public ChartFactory(ChartSection chartSection) {
        this.type = ChartType.toChartType(chartSection.getType());
        this.title = chartSection.getTitle();
        this.yTitle = chartSection.getYTitle();
        this.dataFile = chartSection.getDataFile();
    }

    public SeriesChart build() {
        try {
            parse();
        } catch (Exception ex) {
            throw new RuntimeException("Failed to parse chart data file: " + dataFile.getPath(), ex);
        }

        switch (type) {
            case PIE:
                // We only have one series in a pie chart so just get the first
                return new SeriesChart(ChartType.PIE, title, singletonList(getSeries().get(0)), null, null);
            case BAR:
            case COLUMN:
            case LINE:
            case STACKED_BAR:
            case STACKED_COLUMN:
                return new SeriesChart(type, title, getSeries(), yTitle, getCategories());
            default:
                throw new RuntimeException("Unknown Chart Type: " + type);
        }
    }

    private void parse() throws Exception {
        //TODO - remove after validation
        if (dataFile.isBlank()) {
            return;
        }

        categories = new ArrayList<>();
        series = new HashMap<>();

        Binary binary = dataFile.getNode().getProperty(JcrConstants.JCR_DATA).getBinary();

        XSSFWorkbook workbook;
        try (InputStream is = binary.getStream()) {
            workbook = new XSSFWorkbook(is);
        }

        XSSFSheet sheet = workbook.getSheetAt(0);

        // Get the headers
        Iterator<Row> rowIterator = sheet.rowIterator();
        Row header = rowIterator.next();
        series = new HashMap<>();
        for (int i = 1; i < header.getLastCellNum(); i++) {
            Cell cell = header.getCell(i);
            series.put(i, new Series(cell.getStringCellValue()));
        }

        // Get the data
        rowIterator.forEachRemaining(row -> {
            // First column is the series name (category)
            String category = getStringValue(row.getCell(CATEGORIES_INDEX));
            categories.add(category);

            for (int i = 1; i < row.getLastCellNum(); i++) {
                Cell cell = row.getCell(i);
                series.computeIfAbsent(i, key -> new Series(""))
                    .add(new Point(category, getDoubleValue(cell)));
            }
        });
    }

    private Double getDoubleValue(Cell cell) {
        return cell.getCellType() == Cell.CELL_TYPE_STRING ? Double.valueOf(cell.getStringCellValue()) : cell.getNumericCellValue();
    }

    private String getStringValue(Cell cell) {
        return cell.getCellType() == Cell.CELL_TYPE_STRING ? cell.getStringCellValue() : String.valueOf(cell.getNumericCellValue());
    }

    private List<String> getCategories() {
        return categories;
    }

    private List<Series> getSeries() {
        return new ArrayList<>(series.values());
    }

}
